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

# Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file

dScores[i,c("emotionA_d_score","emotionB_d_score")] <- calculate_EST_dscore(tmp)

# Remove the temporary data file tmp  

rm(tmp)

# Increase our row number variable i by one for the next iteration

i <- i + 1
}

## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)
