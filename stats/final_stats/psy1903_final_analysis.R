#### Load Packages & Set Working Directory ------

if (!require("pacman")) {install.packages("pacman"); require("pacman")}

p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite")

setwd("~/Desktop/psy1903/stats/final_stats")

#### D-score Function --------------------------------

calculate_EST_dscore <- function(data) {
  tmp <- data[data$rt > 300 & data$rt < 5000 & data$correct == TRUE,]
  
  emotionA_trials <- tmp[tmp$valence == "emotionA", ]
  emotionB_trials <- tmp[tmp$valence == "emotionB", ]
  neutral_trials <- tmp[tmp$valence == "neutral", ]
  
  emotionA_means <- mean(emotionA_trials$rt, na.rm = TRUE)
  emotionB_means <- mean(emotionB_trials$rt, na.rm = TRUE)
  neutral_means <- mean(neutral_trials$rt, na.rm = TRUE)
  neutral_sd <- sd(neutral_trials$rt, na.rm = TRUE)
  
  dscore1 <- (emotionA_means - neutral_means) / neutral_sd 
  dscore2 <- (emotionB_means - neutral_means) / neutral_sd
  
  return(list(emotionA_d_score = dscore1, emotionB_d_score = dscore2))
}

#### Questionnaire Scoring Function ---------------

score_questionnaire <- function(data) {
  
  json_data <- data[data$trialType == "questionnaire", "response"]
  
  questionnaire <- fromJSON(json_data[1])
  
  questionnaire <- as.data.frame(questionnaire)
  
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  
  rev_items <- c("prompt4", "prompt10")
  for (rev_item in rev_items) {
    questionnaire[,rev_item] <- 4 - questionnaire[,rev_item]
  }
  
  score <- rowMeans(questionnaire, na.rm = TRUE)
  
  return(score)
  
}

#### For Loop ------------------------------------------
directory_path <- "~/Desktop/psy1903/osfstorage-archive"
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)


dScores <- data.frame(matrix(nrow = length(files_list), ncol = 5))


colnames(dScores) <- c("participant_ID", "emotionA_d_score", "emotionB_d_score", "whichPrime", "questionnaire")

i = 1

for (file in files_list) {
  tmp <- read.csv(file)
  
  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  dScores[i,"participant_ID"] <- participant_ID
  
  dScores[i, "whichPrime"] <- tmp[tmp$trialType == "prime", "whichPrime"]
  
  tmp$rt <- as.numeric(tmp$rt)
  
  tmp$correct <- as.logical(tmp$correct)
  
  tmp$block <- as.factor(tmp$block)
  tmp$valence <- as.factor(tmp$valence)
  tmp$color <- as.factor(tmp$color)
  
  dScores[i,c("emotionA_d_score","emotionB_d_score")] <- calculate_EST_dscore(tmp)
  
  dScores[i,"questionnaire"] <- score_questionnaire(tmp)
  
  rm(tmp)
  
  i <- i + 1
}


#### ANOVA -------------------------------------------

anova_emotionA <- aov(emotionA_d_score ~ whichPrime, data = dScores)

summary(anova_emotionA)

#### T-Test ---------------------------------------------

tukey_result <- TukeyHSD(anova_emotionA)

print(tukey_result)

#### Correlation ---------------------------------------

cor_result <- cor.test(dScores$emotionA_d_score, dScores$questionnaire, method = "pearson")
cor_result

#### Base R Histogram -------------------------------

hist(dScores$emotionA_d_score,
     main = "Distribution of D-Scores",
     xlab = "D-Scores",
     ylab = "Frequency")

#### ggplot Histogram --------------------------------

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

#### ggplot Histogram by Prime ---------------------

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

#### ggplot Box Plot ----------------------------------

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

#### ggplot Scatter Plot -------------------------------

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

#### ggplot Custom Theme ---------------------------

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
