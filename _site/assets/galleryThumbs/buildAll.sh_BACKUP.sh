#!/bin/bash
# THUMBS_FOLDER=C:/xampp/htdocs/GRASSLANDS/TRASH/Thorum/proces/thumbsTest
LARGE_FOLDER=./large
THUMBS_FOLDER=./thumbs
# for file in C:/xampp/htdocs/GRASSLANDS/TRASH/Thorum/proces/large/*
# for file in ./large/*
for file in ./*.jpg
do

  # take out spaces
  # https://stackoverflow.com/questions/2709458/how-to-replace-spaces-in-file-names-using-a-bash-script

  # build the html from filenames
  filename=$(basename "$file")
  filename="${filename%.*}"
  filename="${filename// /_}" # remove spaces

  link='<a href="./images/Thorum/Gallery/large/'
  link+=$filename
  link+='.jpg" data-mediabox="ThorumGallery" data-title="Thorum, procesbilleder" '
  link+=' title="Thorum, procesbilleder" alt="Thorum, procesbilleder">'
  # img
  link+='<img src="./images/Thorum/Gallery/thumbs/'
  link+=$filename
  link+='_thumb.png" alt="Image" /></a>'
  
  # show it here
  echo $filename
  # echo $link >> html.txt
  echo $link >> code/$filename.md

  # next line checks the mime-type of the file
  IMAGE_TYPE=`file --mime-type -b "$file" | awk -F'/' '{print $1}'`
  if [ x$IMAGE_TYPE = "ximage" ]; then
    # IMAGE_SIZE=`file -b $file | sed 's/ //g' | sed 's/,/ /g' | awk  '{print $2}'`
    # WIDTH=`echo $IMAGE_SIZE | sed 's/x/ /g' | awk '{print $1}'`
    # HEIGHT=`echo $IMAGE_SIZE | sed 's/x/ /g' | awk '{print $2}'`           

    # large
    # filename=$(basename "$file")
    # filename="${filename%.*}"
    jpgExtension="jpg"
    pngExtension="png"

    # making large version
    convert "$file" -resize 1280x854 -quality 70 "${LARGE_FOLDER}/${filename}.${jpgExtension}"
    
    # making thumb
    convert "$file" -sample 300x300 -background none -gravity center -extent 300x300 "${THUMBS_FOLDER}/${filename}_thumb.${pngExtension}"
  fi     
done