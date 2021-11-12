package com.sdp.Blog.payload.response;

import com.sdp.Blog.model.Comment;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentResponse {

    private Long id;
    private String description;
    private LocalDateTime dateTime;
    private Long userId;
    private String userName;
    private Long articleId;

    public CommentResponse(Comment comment, Long userId, String userName, Long articleId) {
        this.id = comment.getId();
        this.description = comment.getDescription();
        this.dateTime = comment.getDateTime();
        this.userId = userId;
        this.userName = userName;
        this.articleId = articleId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }
}
