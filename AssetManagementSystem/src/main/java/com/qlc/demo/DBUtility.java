package com.qlc.demo;

import java.sql.*;

import com.mysql.jdbc.Connection;

public class DBUtility {
	
	public static Connection getConnection() throws ClassNotFoundException 
    {
       Connection conn = null;
      
       try 
       {
           String userId = "YOUR USERNAME"; 
           String password = "YOUR PASSWORD";
           Class.forName("com.mysql.jdbc.Driver");
           String url = "DATABASE LOCATION" ;

           conn = (Connection) DriverManager.getConnection(url, userId, password);
           System.out.println("Database connection established");
       } 
       catch (SQLException e) 
       {
           System.err.println(e.getMessage());
       }
       
       return conn;
   }
}
