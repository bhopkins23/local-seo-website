import os
import re

files_to_fix = [
    "affordable-seo-packages/index.html",
    "best-marketing-agencies-bucks-county/index.html", 
    "blog/seo-guide-bucks-county-businesses/index.html",
    "digital-marketing-services/index.html",
    "google-business-profile-optimization/index.html",
    "local-seo-services/index.html",
    "search-engine-marketing/index.html", 
    "seo-services-bucks-county/index.html",
    "seo-services-langhorne-pa/index.html",
    "seo-services-newtown-pa/index.html",
    "seo-services-yardley-pa/index.html",
    "small-business-seo/index.html",
    "social-media-marketing/index.html",
    "website-optimization/index.html"
]

for file_path in files_to_fix:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find and replace the complex nested structure with clean tagline
        pattern = r'<p class="tagline">.*?</p>'
        replacement = '<p class="tagline">Newtown PA & Bucks County</p>'
        
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        print(f"Fixed {file_path}")
        
    except Exception as e:
        print(f"Error fixing {file_path}: {e}")

print("All files processed successfully\!")
SCRIPT_EOF < /dev/null
