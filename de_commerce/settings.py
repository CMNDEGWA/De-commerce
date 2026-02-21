import os

# Media files configuration
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Added default login redirect URL
LOGIN_REDIRECT_URL = 'products:product_list'