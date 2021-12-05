package com.sdp.Blog.payload.request;

import com.sdp.Blog.payload.LengthStrategy;

import javax.validation.constraints.NotBlank;

public class ArticleRequest implements LengthStrategy {
    @NotBlank
    private String title;

    @NotBlank
    private String description;



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

    @Override
    public Boolean checkLength() {
        if(this.description.length() < 2000) return true;
        else return false;
    }
}
