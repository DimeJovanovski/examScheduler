package mk.ukim.finki.examscheduler.web.model.config;

public class JwtAuthConstants {
    public static final String SECRET = "s3cr3tt0k3n";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

}
