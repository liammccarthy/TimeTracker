This project should serve as a template for creating new cake-based
project.

Prerequisites:
--------------

To set up a local working installation for testing and development, you'll need:

- PHP
- PEAR
- Phing
- Git
- PHPUnit
- Apache Httpd
- MySql
- CakePHP (core)

These instructions assume you are using xampp so you already have most of the
dependencies covered.

PEAR/Phing/PHPUnit
------------------

Since the most recent version of xampp still does not have the latest version of
PEAR, Phing, or PHPUnit, you'll need to update these manually. 

1. Open a command prompt and go to the xampp/php directory

2. Execute the following commands to update PEAR:
  - pear update-channels
  - pear upgrade pear

3. Execute the following commands to update Phing:
  - pear channel-discover pear.phing.info
  - pear install phing/phing

4. Execute the following commands to update PHPUnit.
  - pear channel-discover components.ez.no
  - pear channel-discover pear.symfony.com
  - pear channel-discover pear.phpunit.de
  - pear install --alldeps phpunit/PHPUnit

5. Verify that all items are setup properly by typing each of the following:
  - pear -> should receive list of options
  - phpunit -> should receive list of options
  - phing -> should receive error that build.xml does not exist   

If you're using Linux, you can install these using yum:
- php-pear
- php-phpunit

Phing, however, must be installed using PEAR, similar to windows/xampp above.


CakePHP core setup
------------------

1. Obtain the CakePHP distribution from their web site.
2. Make a directory where your cake core will reside.
3. From the cake distribution, extract only the following folders:
   - lib
   - plugins
   - vendors
   
   to your cake core directory
4. Edit your php.ini to add location of your cake core lib folder to the
   "include_path" definition.  Eg (windows):
   
    include_path = ".;\xampp\php\PEAR;\xampp\cake\lib"
  
   Linux should be set accordingly.

That's it.  The cake core should now be available to any cake application.
  

Directories
-----------

src/main/app/ 

This is where your application logic will reside.  This is the app directory
from the CakePHP install, with a couple of minor changes:

- app/Config/core.php has had the Security.salt and Security.cipherSeed changed
- app/Config/bootstrap.php has a line to import application_config.php
- app/Config/database.php has made using the default file and given properties
to parameterise the database configuration (more on that below)
- an example unit test has been placed in the app/Test/Case folder.


src/main/webroot/

This is a copy of the app/webroot directory from the CakePHP installation, but
it has been moved out of the app folder.  This is where static content is placed
for your application.


src/config/

Contains any example configuration files that can be used for deploying the
application to a local development environment or to a test instance.  For
development, usage is optional and you can use these as a template to perform
any custom modifications if necessary.  For test, it is expected that the
configuration necessary to start a test instance will be provided in the "test"
folder.


   
Execution & Deployment
----------------------

To run the project and execute any tasks that have been configured in build.xml
such as unit tests, simply run the command
- phing

from the root directory of the project.  This will execute do preparation stuff,
execute the unit tests, and then package the application.  The resulting output
will be a tar file in the target folder.

The tar file can be extracted to your apache document root to test out the
deployment.


Application Configuration
-------------------------

If your application requires configuration that changes between development,
test, and production, then this configuration should be done as variables within
the application code and then defined in a separate file that will be included
by the file requiring that configuration.  This will allow the application to be
deployed in multiple locations without having to change source code; only the
configuration file will need to be modified.  Only a single configuration file
should be required and used for all configuration across the application.

The cake template requires only configuration for the database.  Our approach to
loading external configuration will be to import a single php configuration file
from bootstrap.php (/app/config).  This is a suggested best practice from the
CakePHP web site.  The cake template bootstrap.php imports a file named
application_config.php.  An example configuration has been placed in the
src/config/devbuild directory of the cake template project and should be placed
somewhere in your php include path (defined in php.ini) or in the same directory
as the php file that is importing it (the latter option being preferred).


Virtual host setup
------------------

Change hosts file:
- Windows - C:\Windows\System32\drivers\etc\hosts
- Linux - /etc/hosts

Add a line:

`127.0.0.1 CakeTemplate`

Change CakeTemplate as appropriate for your project

Next, add lines like this to httpd.conf (modify directories as appropriate)

    #Enable named based virtual hosts on port 80.
    NameVirtualHost *:80
    
    #By default, forward all requests to document root. 
    <VirtualHost *:80>
      ServerName localhost
      DocumentRoot /xampp/htdocs
    </VirtualHost>
    
    #Forward requests for the host "CakeTemplate" to the correct document root
    <VirtualHost *:80>
      ServerName CakeTemplate
      DocumentRoot /xampp/htdocs/CakeTemplate
      DirectoryIndex index.php
      ErrorLog /xampp/apache/logs/CakeTemplate_error_log
      CustomLog /xampp/apache/logs/CakeTemplate_access_log common
    
      <Directory "/xampp/htdocs/CakeTemplate">
        Options Indexes FollowSymLinks Includes ExecCGI
        AllowOverride All
        Require all granted
      </Directory>
    
    </VirtualHost>
