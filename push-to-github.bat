@echo off
echo ========================================
echo  GitHub Upload Script for SEO Website
echo ========================================
echo.
echo STEP 1: Please enter your GitHub username
set /p username="Enter your GitHub username: "
echo.
echo STEP 2: Adding GitHub remote...
git remote add origin https://github.com/%username%/local-seo-website.git
echo.
echo STEP 3: Pushing to GitHub...
git push -u origin main
echo.
echo ========================================
echo SUCCESS! Your website has been uploaded to GitHub
echo.
echo Next steps:
echo 1. Go to: https://github.com/%username%/local-seo-website
echo 2. Click Settings tab
echo 3. Find Pages in left sidebar
echo 4. Set Source to "Deploy from a branch"
echo 5. Select "main" branch and "/ (root)" folder
echo 6. Click Save
echo.
echo Your live website will be at:
echo https://%username%.github.io/local-seo-website/
echo ========================================
pause