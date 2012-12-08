<?php

require_once 'PHPUnit/Autoload.php';
require_once 'MockController.php';

class MockControllerTest extends CakeTestCase {

    public function setUp() {
      parent::setUp();
      $this->mockController = new MockController();
    }


    public function testMockController() {
      for ($i = 1; $i <= 10; $i++) {
        /* getCallCount is a simple method that increments a counter when called
           and returns that value. */
        $this->assertEquals($i, $this->mockController->getCallCount());
      }      
      
                                                  
    }    
    

}
?>