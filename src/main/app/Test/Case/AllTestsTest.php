<?php

class AllTest extends CakeTestSuite {

    public static function suite() {
      $suite = new CakeTestSuite('All Controller Tests');

      $suite->addTestDirectoryRecursive(APP_TEST_CASES);

      return $suite;
   }

}