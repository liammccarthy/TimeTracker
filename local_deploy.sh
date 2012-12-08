cd ~/git/TimeTracker/
phing
chmod -R 775 target
cd target
tar -xvf TimeTracker.tar
cp -rf TimeTracker /var/www/html/
chmod -R 775 /var/www/html/TimeTracker/app/tmp


