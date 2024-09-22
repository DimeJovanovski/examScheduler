package mk.ukim.finki.examscheduler.web.model.config;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthenticationResponse {

    @JsonProperty("jwt")
    private final String jwt;

    public AuthenticationResponse(String jwt) {
        this.jwt = jwt;
    }

    @JsonProperty("jwt")
    public String getJwt() {
        return jwt;
    }
}