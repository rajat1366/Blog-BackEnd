package com.sdp.Blog.controller;

import com.sdp.Blog.model.Article;
import com.sdp.Blog.model.Comment;
import com.sdp.Blog.model.User;
import com.sdp.Blog.payload.request.ArticleRequest;
import com.sdp.Blog.payload.response.ArticleResponse;
import com.sdp.Blog.payload.response.MessageResponse;
import com.sdp.Blog.payload.response.PagingResponse;
import com.sdp.Blog.security.services.UserDetailsImpl;
import com.sdp.Blog.service.ArticleService;
import com.sdp.Blog.service.CommentService;
import com.sdp.Blog.service.UserService;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/article")
public class ArticleController {
    private static final Logger logger = LogManager.getLogger(ArticleController.class);


    @Autowired
    UserService userService;

    @Autowired
    ArticleService articleService;

    @Autowired
    CommentService commentService;

    @GetMapping("/")
    public ResponseEntity<?>getArticles(@RequestParam(required = false) String searchData,@RequestParam(defaultValue = "0") int page,
                                        @RequestParam(defaultValue = "3") int size){
        Pageable paging = PageRequest.of(page, size);
        ArrayList<ArticleResponse> articleResponses=new ArrayList<ArticleResponse>();
            if(searchData != null){
                Page<Article> listofArticles =  articleService.getArticlesFromSearchData(searchData,paging);
                generateResponse(articleResponses,listofArticles);
                logger.info("[SEARCH REQUEST] - search value: "+searchData);
                return ResponseEntity.ok(new PagingResponse(articleResponses, listofArticles.getTotalElements(), listofArticles.getTotalPages()));
//                return ResponseEntity.ok(articleResponses);
            } else {
                Page<Article> listofArticles =  articleService.getArticles(paging);
                generateResponse(articleResponses,listofArticles);
                logger.info("[DATA REQUEST] - Requesting latest Articles");
                return ResponseEntity.ok(articleResponses);
            }

    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getArticlebyId(@PathVariable("id") long id ){
        Optional<Article> article = articleService.getArticlesById(id);
        if(article.isPresent()){
            return ResponseEntity.ok(article.get());
        } else {
            logger.error("[NO RECORD FOUND] - Article info does not exist");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Article Not found!!!"));

        }
    }

//    @GetMapping("/")
//    public List<Article> getAllArticles() {
//        return articleService.findAll();
//    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> deleteArticle(@PathVariable("id") long id) {
        try {
            List<Comment> comments = commentService.getAllComments(id);
            for(Comment com : comments) {
                commentService.deleteById(com.getId());
            }
            
            articleService.deleteById(id);
            logger.info("[RECORD DELETED] - Article deleted successfully");
            return ResponseEntity.ok(new MessageResponse("Article details deleted successfully!"));
        } catch (Exception e) {
            logger.error("[UNABLE TO DELETE RECORD] - Unable to delete Article to database "+e.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Unable to delete article!"));
        }
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> saveArticle(@Valid @RequestBody ArticleRequest articleRequest) {
        try {

            UserDetailsImpl userDetails =
                    (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (articleService.findByTitle(articleRequest.getTitle().toLowerCase())) {
                logger.error("[RECORD EXISTS] - Article already exits with this name");
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Article already exits!!"));
            }
            User user = userService.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("Error: User is not found."));

            Article article = new Article(articleRequest.getTitle().toLowerCase(), articleRequest.getDescription(),  LocalDateTime.now(),user);

            Article result = articleService.saveArticle(article);

            if(result!= null) {
                logger.info("[RECORD ADDED] - Article added successfully" + result.getTitle());
                return ResponseEntity.ok(new MessageResponse("Article added successfully!"));
            } else{
                logger.error("[UNABLE TO ADD RECORD] - Unable to add Article to database");
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Unable to add new Article!"));
            }
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            logger.error("[UNABLE TO ADD RECORD] - Unable to add Article to database "+e.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Unable to add new Article!"));
        }

    }
    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> updateArticle(@Valid @PathVariable("id") long id, @RequestBody ArticleRequest articleRequest) throws ParseException {
        try {
            Optional<Article> article = articleService.getArticlesById(id);
            UserDetailsImpl userDetails =
                    (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userService.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("Error: User is not found."));

            Article newArticle = article.get();
            newArticle.setTitle(articleRequest.getTitle().toLowerCase());
            newArticle.setDescription(articleRequest.getDescription());
            newArticle.setDateTime(LocalDateTime.now());

            Article result = articleService.saveArticle(newArticle);

            if (result != null) {
                logger.info("[RECORD UPDATED] - Article updated successfully" + result.getTitle());
                return ResponseEntity.ok(new MessageResponse("Article details updated successfully!"));
            } else {
                logger.error("[UNABLE TO UPDATE RECORD] - Unable to update Article to database");
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Unable to update Article details!"));
            }
        }
            catch(Exception e){
            System.out.println(e.getMessage());
            logger.error("[UNABLE TO UPDATE RECORD] - Unable to Update Article to database "+e.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Unable to UPDATE Article!"));
        }
    }
    public void generateResponse(ArrayList<ArticleResponse> articleResponses, Page<Article> listofArticles){
        if(listofArticles != null) {
            for (int i = 0; i < listofArticles.getContent().size(); i++) {
                Article article = listofArticles.getContent().get(i);
                articleResponses.add(new ArticleResponse(article, article.getUser().getId() ,article.getUser().getName()));

            }
        }
    }
}
