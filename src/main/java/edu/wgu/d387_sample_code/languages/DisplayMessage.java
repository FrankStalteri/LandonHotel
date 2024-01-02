package edu.wgu.d387_sample_code.languages;

import org.springframework.stereotype.Component;

import java.util.Locale;
import java.util.ResourceBundle;

@Component
public class DisplayMessage {
    public String getWelcomeMessage(Locale locale) {
        ResourceBundle resourceBundle = ResourceBundle.getBundle("languages", locale);
        return resourceBundle.getString("welcomeMessage");
    }
}
