package com.sdp.Blog.service;

import com.sdp.Blog.model.Comment;
import com.sdp.Blog.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    public Comment saveComment(Comment comment){
        return commentRepository.save(comment);
    }

    public Optional<Comment> getCommentById(long commentId) {
        return commentRepository.findById(commentId);
    }

    public List<Comment> getAllComments(long article_id) {
        return commentRepository.getAllCommentsByArticle(article_id);
    }

}
