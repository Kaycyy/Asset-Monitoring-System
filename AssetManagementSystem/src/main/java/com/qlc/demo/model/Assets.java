package com.qlc.demo.model;


public class Assets {
	private int uid;
	private String name;
	private String description;
	private String category;
	private String srno;
	private int quantity;
	private String acquisitionDate;
	private int cost;
	private String owner;
	private String location;
	private String status;

	public final String getAcquisitionDate() {
		return acquisitionDate;
	}

	public final void setAcquisitionDate(String acquisitionDate) {
		this.acquisitionDate = acquisitionDate;
	}


	public final int getUid() {
		return uid;
	}

	public final void setUid(int uid) {
		this.uid = uid;
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

	public final String getCategory() {
		return category;
	}

	public final void setCategory(String category) {
		this.category = category;
	}

	public final String getSrno() {
		return srno;
	}

	public final void setSrno(String srno) {
		this.srno = srno;
	}

	public final int getQuantity() {
		return quantity;
	}

	public final void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public final int getCost() {
		return cost;
	}

	public final void setCost(int cost) {
		this.cost = cost;
	}

	public final String getOwner() {
		return owner;
	}

	public final void setOwner(String owner) {
		this.owner = owner;
	}

	public final String getLocation() {
		return location;
	}

	public final void setLocation(String location) {
		this.location = location;
	}

	public final String getStatus() {
		return status;
	}

	public final void setStatus(String status) {
		this.status = status;
	}

	public Assets(int uid, String name, String description, String category, String srno, int quantity,
			String acquisitionDate, int cost, String owner, String location, String status) {
		super();
		this.uid = uid;
		this.name = name;
		this.description = description;
		this.category = category;
		this.srno = srno;
		this.quantity = quantity;
		this.acquisitionDate = acquisitionDate;
		this.cost = cost;
		this.owner = owner;
		this.location = location;
		this.status = status;
	}

	
	public Assets() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Assets [uid=" + uid + ", name=" + name + ", description=" + description + ", category=" + category
				+ ", srno=" + srno + ", quantity=" + quantity + ", AcquisitionDate=" + acquisitionDate + ", cost="
				+ cost + ", owner=" + owner + ", location=" + location + ", status=" + status + "]";
	}
	
	

}
