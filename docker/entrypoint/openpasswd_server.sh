if [ -n "${OPENPASSWD_SERVER}" ]; then 
    sed -i 's|//localhost:7777|'"$OPENPASSWD_SERVER"'|g' /usr/share/nginx/html/assets/*.js
fi