package edu.wgu.d387_sample_code.languages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class WelcomeController {

    @Autowired
    private DisplayMessage displayMessage;

    @GetMapping("/welcome-messageUS")
    public String getWelcomeMessageUS(Locale locale) {
        locale = Locale.US;
        String welcomeMessage = displayMessage.getWelcomeMessage(locale);
        return welcomeMessage;
    }

    @GetMapping("/welcome-messageFr")
    public String getWelcomeMessageFr(Locale locale) {
        locale = Locale.CANADA_FRENCH;
        String welcomeMessage = displayMessage.getWelcomeMessage(locale);
        return welcomeMessage;
    }

    @GetMapping("/TimeZone")
    public ResponseEntity<String> getTimeConversion() {
        String announcement = "ATTENTION: There is a presentation beginning at: " + TZConvert.getTime();
        return new ResponseEntity<String> (announcement, HttpStatus.OK);
    }
}
