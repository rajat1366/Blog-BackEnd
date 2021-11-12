package com.sdp.Blog.repository;

import com.sdp.Blog.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {

    @Query("SELECT c FROM Comment c WHERE c.article.id=?1 ")
    List<Comment> getAllCommentsByArticle(long article_id);

}
