package com.sdp.Blog.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(	name = "articles",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "title")
        })
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max=255)
    private String title;

    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private LocalDateTime dateTime;

    @JsonIgnore
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @JsonIgnore
    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments;

    public Article() { }

    public Article(@NotBlank String title, @NotBlank String description, @NotBlank LocalDateTime dateTime, @NotBlank User user) {
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.user = user;
    }

    public Article(Long id, @NotBlank @Size(max = 255) String title, @NotBlank String description, LocalDateTime dateTime, User user) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dateTime = dateTime;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}
