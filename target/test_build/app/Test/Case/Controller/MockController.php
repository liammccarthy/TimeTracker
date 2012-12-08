<?php

class MockController {

  var $callCounter = 0;
  
  public function getCallCount() {
    return ++$this->callCounter;        
  }  

}

?>