package com.example.socialmedia.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptions {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> otherExceptionsHandler(Exception ue, WebRequest req)
    {
        ErrorDetails errorDetails = new ErrorDetails(ue.getMessage(),req.getDescription(false), LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails> userExceptionsHandler(UserException ue, WebRequest req)
    {
        ErrorDetails errorDetails = new ErrorDetails(ue.getMessage(),req.getDescription(false), LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(ChatException.class)
    public ResponseEntity<ErrorDetails> chatExceptionsHandler(ChatException ue, WebRequest req)
    {
        ErrorDetails errorDetails = new ErrorDetails(ue.getMessage(),req.getDescription(false), LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(CommentException.class)
    public ResponseEntity<ErrorDetails> commentExceptionsHandler(CommentException ue, WebRequest req)
    {
        ErrorDetails errorDetails = new ErrorDetails(ue.getMessage(),req.getDescription(false), LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(MessageException.class)
    public ResponseEntity<ErrorDetails> messageExceptionsHandler(MessageException ue, WebRequest req)
    {
        ErrorDetails errorDetails = new ErrorDetails(ue.getMessage(),req.getDescription(false), LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(PostException.class)
    public ResponseEntity<ErrorDetails> postExceptionsHandler(PostException ue, WebRequest req)
    {
        ErrorDetails errorDetails = new ErrorDetails(ue.getMessage(),req.getDescription(false), LocalDateTime.now());

        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }
}
