cd /var/www/cms
echo "in cms"
sudo yarn install
pm2 start start.sh
