setwd("~/Desktop/psy1903/stats/")
dir.create("data_cleaning")
dir.create("data_cleaning/scripts")
dir.create("data_cleaning/data")
dir.create("data_cleaning/output")

setwd("~/Desktop/psy1903/stats/data_cleaning/scripts")



if (!require("pacman")) {install.packages("pacman"); require("pacman")}  # First install and load in pacman to R
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")  # tidyverse contains many packages like dplyr, tidyr, stringr, and ggplot2, among others, and the additional packages should cover our data manipulations, plotting, and analyses

est_data1 <- read.csv("./osfstorage-archive/est-experiment-2024-11-05-21-53-50.csv", header = TRUE, na.strings = "NA")
?read.csv

str(est_data1)
summary(est_data1)

#rows where row is not a practice block
est_data2 <- est_data1[est_data1$block == "emotionA" | 
                         est_data1$block == "emotionB",
  c("trial_index", "rt", "response", "block", "word", "valence", "color", "correct")]

str(est_data2)

#convert to integer or factor

est_data2$response <- as.character(est_data2$response)


column_names <- c("block", "valence", "color")


for (column_name in column_names) {
  est_data2[,column_name] <- as.factor(est_data2[,column_name])
}
calculate_EST_dscore <- function(data) {
  #step 1 only select trials w rt > 300 and rt < 5000
  tmp <- data[data$rt > 300 & data$rt < 5000,]
  tmp <- tmp[tmp$correct == TRUE,]
  
  #step 2 separate emotion and neutral trials
  
  emotionA_trials <- tmp[tmp$valence == "emotionA", ]
  emotionB_trials <- tmp[tmp$valence == "emotionB", ]
  neutral_trials <- tmp[tmp$valence == "neutral", ]
  
  #step 3 calculate means and sd for emotion and neutral trials
  
  emotionA_means <- mean(emotionA_trials$rt, na.omit = TRUE)
  emotionB_means <- mean(emotionB_trials$rt, na.omit = TRUE)
  neutral_means <- mean(neutral_trials$rt, na.omit = TRUE)
  neutral_sd <- sd(neutral_trials$rt, na.rm = TRUE)
  
  
  #step 4 calculate dscore
  
  dscore1 <- (emotionA_means - neutral_means) / neutral_sd 
  dscore2 <- (emotionB_means - neutral_means) / neutral_sd
  
  return(list(emotionA_d_score = dscore1, emotionB_d_score = dscore2))
}

calculate_EST_dscore(est_data1)



## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* contain your raw participant csv data files and no other files.
directory_path <- "~/Desktop/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)

## EST
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 3))

## Rename the default column names to something meaningful

## EST
colnames(dScores) <- c("participant_ID", "emotionA_d_score", "emotionB_d_score")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1

## Now fill in the remaining code following the commented instructions:

## Initiate a for loop that iterates across each file in files_list


for (file in files_list) {
  tmp <- read.csv(file)
  
  # Use read.csv to read in your file as a temporary data frame called tmp
  
  # Assign participant_ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  # Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  
  
  dScores[i,"participant_ID"] <- participant_ID
  
  
  dScores[i, "whichPrime"] <- tmp[tmp$trialType == "prime", "whichPrime"]
  
  #make rt column numeric
  
  tmp$rt <- as.numeric(tmp$rt)
  
  # make correct column boolean
  
  tmp$correct <- as.logical(tmp$correct)
  
  #appropriate columns are factors--block, valence, color
  
  tmp$block <- as.factor(tmp$block)
  tmp$valence <- as.factor(tmp$valence)
  tmp$color <- as.factor(tmp$color)
  
  # Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
  
  dScores[i,c("emotionA_d_score","emotionB_d_score")] <- calculate_EST_dscore(tmp)
  
  dScores[i,"questionnaire"] <- score_questionnaire(tmp)
  
  # Remove the temporary data file tmp  
  
  rm(tmp)
  
  # Increase our row number variable i by one for the next iteration
  
  i <- i + 1
}

dScores$whichPrime <- as.factor(dScores$whichPrime)

str(dScores)

## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

#### Questionnaire Scoring -----------------------------------------------------

## Read in data file to a data frame called iat_test
iat_test <- read.csv("~/Desktop/psy1903/stats/data_cleaning/data/my-iat-test-data.csv")

## Extract questionnaire data

json_data <- iat_test[iat_test$trialType == "Questionnaire","response"]

## Use fromJSON to Convert from JSON to data frame

questionnaire <- fromJSON(json_data)
str(questionnaire)
questionnaire <- as.data.frame(questionnaire)

## Convert to numeric
questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))


## Reverse score if necessary


## Calculate mean or sum score
score <- rowMeans(questionnaire, na.rm = TRUE)

## Initiate function called score_questionnaire that accepts a single argument called `data`. Within this function...

score_questionnaire <- function(data) {
  
## Extract questionnaire data cell
  json_data <- data[data$trialType == "questionnaire", "response"]
  

## Use fromJSON to convert from JSON to data frame
  
  questionnaire <- fromJSON(json_data[1])
  # str(questionnaire)
  questionnaire <- as.data.frame(questionnaire)

## Convert to numeric

  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  
## Reverse score if necessary

## Calculate & return questionnaire score (mean)
  
  score <- rowMeans(questionnaire, na.rm = TRUE)
  
  return(score)
  
}

score_questionnaire(est_data1)

write.csv(
  dScores,
  "~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv",
  row.names = FALSE
)

dScores$whichPrime <- as.factor(dScores$whichPrime)

anova_emotionA <- aov(emotionA_d_score ~ whichPrime, data = dScores)

summary(anova_emotionA)


tukey_result <- TukeyHSD(anova_emotionA)

summary(tukey_result)

class(dScores$whichPrime)
levels(dScores$whichPrime)
str(dScores)

cor_result <- cor.test(dScores$emotionA_d_score, dScores$questionnaire, method = "pearson")
cor_result

hist(dScores$emotionA_d_score,
     main = "Distribution of D-Scores",
     xlab = "D-Scores",
     ylab = "Frequency")

library(ggplot2)

ggplot(dScores, aes(x = emotionA_d_score)) +
  geom_histogram(binwidth = 0.1,
                 fill = "skyblue",
                 color = "black") +

labs(
  title = "Distribution of D-Scores",
     x = "D-Scores",
     y = "Frequency")
+
  theme_minimal()

library(ggplot2)

ggplot(dScores, aes(x = emotionA_d_score)) +
  geom_histogram(binwidth = 0.1,
                 fill = "skyblue",
                 color = "black") +
  labs(
    title = "Distribution of D-Scores",
    x = "D-Scores",
    y = "Frequency"
    ) +
  theme_classic() +
  facet_wrap(~whichPrime)

library(ggplot2)

ggplot(dScores, aes(x = whichPrime, y = emotionA_d_score, fill = whichPrime)) +
  geom_boxplot() +
  labs(
    title = "Effect of Prime on D-Scores",
    x = "Prime Condition",
    y = "D-Scores"
  ) +
  scale_x_discrete(labels = c(
    "failure" = "Failure",
    "success" = "Success",
    "neutral" = "Neutral"
  )) +
  theme_classic() +
  theme(legend.position = "none")

ggplot(dScores, aes(x = questionnaire, y = emotionA_d_score)) +
  geom_point(color = "blue") +
  geom_smooth(method = "lm", se = FALSE,
              color = "pink", size = 1) +
  labs(
    title = "Correlation Between Questionnaire and D-Scores",
    x = "Questionnaire",
    y = "D-Scores"
  ) +
  theme_classic()
  
library(ggplot2)

custom_theme <- theme(
  plot.title = element_text(family = "Comic Sans MS", size = 20, color = "pink", face = "bold", hjust = 0.5),
  plot.subtitle = element_text(family = "Comic Sans MS", size = 15, color = "lightpink", hjust = 0.5),
  axis.title.x = element_text(family = "Comic Sans MS", size = 14, color = "purple"),
  axis.title.y = element_text(family = "Comic Sans MS", size = 14, color = "purple"),
  axis.text.x = element_text(family = "Comic Sans MS", size = 12, color = "purple"),
  axis.text.y = element_text(family = "Comic Sans MS", size = 12, color = "purple"),
  panel.background = element_rect(fill = "lavender", color = "pink"),
  panel.grid.major = element_line(color = "pink", size = 0.5),
  panel.grid.minor = element_line(color = "lightpink", size = 0.25)
)
  
  
  
ggplot(dScores, aes(x = emotionA_d_score)) +
    geom_histogram(binwidth = 0.1,
                   fill = "skyblue",
                   color = "purple") +
    labs(
      title = "Distribution of D-Scores",
      x = "D-Scores",
      y = "Frequency"
    ) +
    theme_classic() +
    custom_theme +
    facet_wrap(~whichPrime)
  




