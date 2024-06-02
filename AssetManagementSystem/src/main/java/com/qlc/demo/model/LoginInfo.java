package com.qlc.demo.model;

public class LoginInfo {
	private int id;
	private String username;
	private String password;
	private int role;
	private int managerId;
	private String fullName;

	public final int getId() {
		return id;
	}

	public final void setId(int id) {
		this.id = id;
	}

	public final String getUsername() {
		return username;
	}

	public final void setUsername(String username) {
		this.username = username;
	}

	public final String getPassword() {
		return password;
	}

	public final void setPassword(String password) {
		this.password = password;
	}

	public final int getRole() {
		return role;
	}

	public final void setRole(int role) {
		this.role = role;
	}

	public final int getManagerId() {
		return managerId;
	}

	public final void setManagerId(int managerId) {
		this.managerId = managerId;
	}

	public final String getFullName() {
		return fullName;
	}

	public final void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public LoginInfo(int id, String username, String password, int role, int managerId, String fullName) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
		this.managerId = managerId;
		this.fullName = fullName;
	}

	public LoginInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Login [id=" + id + ", username=" + username + ", password=" + password + ", role=" + role
				+ ", managerId=" + managerId + ", fullName=" + fullName + "]";
	}

}
