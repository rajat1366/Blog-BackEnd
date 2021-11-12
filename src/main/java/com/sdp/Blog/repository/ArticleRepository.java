package com.sdp.Blog.repository;

import com.sdp.Blog.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article,Long> {
    Boolean existsByTitle(String name);

    Page<Article> findByTitleContainingOrDescriptionContaining(String title, String description, Pageable pageable);

    Page<Article> findAllByOrderByDateTimeDesc(Pageable pageable);

}
