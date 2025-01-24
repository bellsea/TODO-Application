package jp.ac.todo.Model.Response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RgisterResponse {
    private String token;

    public RgisterResponse(String token) {
        this.token = token;
    }
}
