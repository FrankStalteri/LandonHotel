package edu.wgu.d387_sample_code;

import edu.wgu.d387_sample_code.languages.DisplayMessage;
import edu.wgu.d387_sample_code.languages.WelcomeController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.util.Locale;

@SpringBootApplication
public class D387SampleCodeApplication {

	public static void main(String[] args) {
		SpringApplication.run(D387SampleCodeApplication.class, args);

		DisplayMessage displayMessage = new DisplayMessage();

		Thread threadUS = new Thread(() -> {
			Locale locale = Locale.US;
			String message = displayMessage.getWelcomeMessage(locale);
			System.out.println("US Thread: " + message);
		});

		Thread threadFR = new Thread(() -> {
			Locale locale = Locale.CANADA_FRENCH;
			String message = displayMessage.getWelcomeMessage(locale);
			System.out.println("FR Thread: " + message);
		});

		threadUS.start();
		threadFR.start();
	}

}
