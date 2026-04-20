# YouTube Embed Link Extractor

A lightweight browser-console JavaScript script to extract YouTube video links from embedded players on webpages.

## Overview

This project helps you find the original YouTube watch URL from a page that embeds a YouTube video. It is useful when the page contains iframe-based or script-injected YouTube embeds and you want to identify the direct video link visible in the page source or DOM.

## Features

- Scans:
  - `iframe`
  - `embed`
  - `object`
  - `video`
  - `source`
- Converts YouTube embed URLs into standard watch URLs
- Searches the HTML source for hidden YouTube links
- Searches inline script tags for escaped embed links
- Prints all discovered links in the browser console

## Project Structure

```text
youtube-embed-link-extractor/
├── .gitignore
├── LICENSE
├── README.md
├── CHANGELOG.md
├── scripts/
│   └── extract-youtube-link.js
└── docs/
    └── usage.md
```text

## How to Use:
1. Open the webpage containing the embedded video.
2. Open Developer Tools in your browser.
3. Go to the Console tab.
4. Copy the contents of scripts/extract-youtube-link.js.
5. Paste the script into the console.
6. Press Enter.
7. Review the output for the extracted YouTube link(s).

Example Output:
Found YouTube link(s):
https://www.youtube.com/watch?v=XXXXXXXXXXX
