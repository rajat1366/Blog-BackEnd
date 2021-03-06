package com.sdp.Blog.payload.request;

import com.sdp.Blog.payload.LengthStrategy;

import javax.validation.constraints.NotBlank;

public class CommentRequest implements LengthStrategy {
    @NotBlank
    private String article_id;
    @NotBlank
    private String description;

    public CommentRequest(@NotBlank String article_id, @NotBlank String description) {
        this.article_id = article_id;
        this.description = description;
    }

    public String getArticle_id() {
        return article_id;
    }

    public void setArticle_id(String article_id) {
        this.article_id = article_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public Boolean checkLength() {
        if(this.description.length() < 1000) return true;
        else return false;
    }
}
