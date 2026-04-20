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
