package jp.ac.todo.Contoroller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DemoController {

  @GetMapping("test")
  public String getMethodName() {
    return "test";
  }

}