package com.sdp.Blog.payload.response;

import com.sdp.Blog.model.Article;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class ArticleResponse {

    private Long id;

    private String title;

    private String description;

    private LocalDateTime dateTime;
    private Long userId;
    private String username;

    public ArticleResponse(Article article, Long userId, String username) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.description = article.getDescription();
        this.dateTime = article.getDateTime();
        this.userId = userId;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
