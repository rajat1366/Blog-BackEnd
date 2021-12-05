package com.sdp.Blog.controller;


import com.sdp.Blog.model.Article;
import com.sdp.Blog.model.Comment;
import com.sdp.Blog.model.User;
import com.sdp.Blog.payload.request.CommentRequest;
import com.sdp.Blog.payload.response.CommentResponse;
import com.sdp.Blog.payload.response.MessageResponse;
import com.sdp.Blog.security.services.UserDetailsImpl;
import com.sdp.Blog.service.ArticleService;
import com.sdp.Blog.service.CommentService;
import com.sdp.Blog.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/comment")

public class CommentController {
    private static final Logger logger = LogManager.getLogger(CommentController.class);

    @Autowired
    CommentService commentService;

    @Autowired
    UserService userService;

    @Autowired
    ArticleService articleService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getAllComments(@PathVariable("id") long article_id){

        List<Comment> listOfComments = commentService.getAllComments(article_id);
        ArrayList<CommentResponse> commentResponses=new ArrayList<CommentResponse>();

        for (int i = 0; i < listOfComments.size(); i++) {
            Comment comment = listOfComments.get(i);
            commentResponses.add(new CommentResponse(comment,comment.getUser().getId(),comment.getUser().getUsername(),comment.getArticle().getId()));
        }
        return ResponseEntity.ok(commentResponses);
    }

    @GetMapping("/FromId/{id}")
    public ResponseEntity<?> getCommentFromId(@PathVariable("id") long comment_id){
        Optional<Comment> comment = commentService.getCommentById(comment_id);

        if(comment.isPresent()){
            Comment co = comment.get();
            return ResponseEntity.ok(new CommentResponse(co,co.getUser().getId(),co.getUser().getUsername(),co.getArticle().getId()));
        } else {
            logger.error("[NO RECORD FOUND] - Comment not found");
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Comment Not found!!!"));
        }

    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> saveComment(@Valid @RequestBody CommentRequest commentRequest) {
         try{
            if(!commentRequest.checkLength()){
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Unable to add comment!! Length is greater than 500  "));
            }
            UserDetailsImpl userDetails =
                    (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            User user = userService.findById(userDetails.getId()).orElseThrow(() -> new RuntimeException("Error: User is not found."));
            Article article = articleService.getArticlesById(Long.parseLong(commentRequest.getArticle_id())).orElseThrow(() -> new RuntimeException("Error: Article not found"));

            Comment comment = new Comment(commentRequest.getDescription(), LocalDateTime.now(), user, article);

            Comment result = commentService.saveComment(comment);
            if (result != null) {
                logger.info("[RECORD ADDED] - Comment added successfully");
                return ResponseEntity.ok(new MessageResponse("Comment added successfully!"));
            } else {
                logger.error("[UNABLE TO ADD RECORD] - Unable to add comment to database");
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Unable to add comment!!"));
            }
        }
         catch(Exception e){
            System.out.println(e.getMessage());
            logger.error("[UNABLE TO ADD RECORD] - Unable to add Comment to database "+e.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Unable to add new Comment!"));
        }

    }
    @PutMapping("/update")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateComment(@Valid @RequestBody Comment comment) {
        try {
        Comment commentFromDB = commentService.getCommentById(comment.getId()).orElseThrow(() -> new RuntimeException("Error: Rating not found"));
        commentFromDB.setDescription(comment.getDescription());

        Comment result = commentService.saveComment(commentFromDB);

            if(result != null ){
                logger.info("[RECORD UPDATED] - Comment Updated sucessfully");
                return ResponseEntity.ok(new MessageResponse("Comment Updated sucessfully!"));
            } else {
                logger.error("[UNABLE TO UPDATE RECORD] - Unable to update comment");
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Unable to update comment!"));
            }
        }
        catch(Exception e){
            System.out.println(e.getMessage());
            logger.error("[UNABLE TO UPDATE RECORD] - Unable to update Article to database "+e.getMessage());
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Unable to update Article!"));
        }
    }


}
