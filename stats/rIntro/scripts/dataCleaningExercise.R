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
