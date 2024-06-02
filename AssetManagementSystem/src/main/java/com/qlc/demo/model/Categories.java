package com.qlc.demo.model;

public class Categories {
	private int id;
	private String name;
	private String description;

	public Categories(int id, String name, String description) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
	}

	public final int getId() {
		return id;
	}

	public final void setId(int id) {
		this.id = id;
	}

	public final String getName() {
		return name;
	}

	public final void setName(String name) {
		this.name = name;
	}

	public final String getDescription() {
		return description;
	}

	public final void setDescription(String description) {
		this.description = description;
	}

	public Categories() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Categories [id=" + id + ", name=" + name + ", description=" + description + "]";
	}
	
	
	

}
