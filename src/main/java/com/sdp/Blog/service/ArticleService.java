package com.sdp.Blog.service;

import com.sdp.Blog.model.Article;
import com.sdp.Blog.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }
    public Article saveArticle(Article article){
        return articleRepository.save(article);
    }
    public Boolean findByTitle(String name){
        return articleRepository.existsByTitle(name);
    }

    public Page<Article> getArticlesByDateTime(Pageable pageable){
        return articleRepository.findAllByOrderByDateTimeDesc(pageable);
    }
    public Page<Article >getArticlesFromSearchData(String searchData,Pageable pageable){
        return  articleRepository.findByTitleContainingOrDescriptionContaining(searchData,searchData, pageable);
    }
    public Optional<Article> getArticlesById(long id) {
        return articleRepository.findById(id);
    }

    public void deleteById(long id) {
        articleRepository.deleteById(id);
    }


    public List<Article> findAll() {
        return articleRepository.findAll();
    }

    public Page<Article> getArticles(Pageable pageable){
        return articleRepository.findAllByOrderByDateTimeDesc(pageable);
    }

}
