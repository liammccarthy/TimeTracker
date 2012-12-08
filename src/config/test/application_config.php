<?php
  define('DB_SERVER', 'localhost');
  define('DB_PORT', '3306');  
  define('DB_USER', 'testUser');  
  define('DB_PASS', '');  
  define('DB_NAME', 'testDatabase');

  /**
   * A random string used in security hashing methods.
   */
  Configure::write('Security.salt', 'kRwdsczlbx6m35iuEw1J1tIBnzIVIqKUm95Hatsg');

  /**
   * A random numeric string (digits only) used to encrypt/decrypt strings.
   */
  Configure::write('Security.cipherSeed', '65348798465465984613216546466');

?>
