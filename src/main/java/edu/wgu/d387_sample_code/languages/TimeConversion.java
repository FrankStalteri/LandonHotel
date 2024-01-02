package edu.wgu.d387_sample_code.languages;

import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class TimeConversion {
    public String getTimeConversion () {
        ZonedDateTime currentInstant = ZonedDateTime.now(ZoneId.of("Europe/Paris"));
        ZonedDateTime mtInstant = currentInstant.withZoneSameInstant(ZoneId.of("Europe/Malta"));
        ZonedDateTime utcInstant = mtInstant.withZoneSameInstant(ZoneId.of("UTC"));

        // Define a formatter for hours and minutes
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

        // Format the ZonedDateTime objects
        String formattedEU = currentInstant.format(formatter);
        String formattedMT = mtInstant.format(formatter);
        String formattedUTC = utcInstant.format(formatter);

        return "EU Time: " + formattedEU + " MT Time: " + formattedMT + " UTC Time: " + formattedUTC;
    }
}
