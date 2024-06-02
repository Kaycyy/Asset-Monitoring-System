package com.qlc.demo.service;

import com.qlc.demo.DBUtility;
import com.qlc.demo.model.Assets;
import com.qlc.demo.model.Categories;
import com.qlc.demo.model.LoginInfo;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.mysql.jdbc.*;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;

public class Service {

	// LOGIN
	public static LoginInfo getLoginInfo(String username) {

		LoginInfo info = new LoginInfo();
		try (Connection conn = DBUtility.getConnection()) {

			String query = "SELECT * from UserLogin where Username=?";

			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setString(1, username);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				info.setId(rs.getInt(1));
				info.setUsername(rs.getString(2));
				info.setPassword(rs.getString(3));
				info.setRole(rs.getInt(4));
				info.setManagerId(rs.getInt(5));
				info.setFullName(rs.getString(6));
			}
		}

		catch (Exception e) {
			System.out.println(e);
		}

		return info;

	}

	public static boolean checkIfUserExists(String username, String password) {
		// TODO Auto-generated method stub
		int count = 0;

		try (Connection conn = DBUtility.getConnection()) {

			String query = "SELECT COUNT(*) from UserLogin where Username=? and Password =?";

			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setString(1, username);
			ps.setString(2, password);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				count = rs.getInt(1);
			}
		}

		catch (Exception e) {
			System.out.println(e);
		}

		if (count > 0)
			return true;
		else
			return false;

	}

	// ----------------------------------------------------------------------------------------------------------
	// ASSETS

	public static int addAsset(Assets asset) {
		int count = 0;

		try (Connection conn = DBUtility.getConnection()) {

			String query = "INSERT INTO Assets(Name, Description, Category, SerialNo, Quantity, AcquisitionDate, Cost, Owner, Location, Status) VALUES(?,?,?,?,?,?,?,?,?,?)";

			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setString(1, asset.getName());
			ps.setString(2, asset.getDescription());
			ps.setString(3, asset.getCategory());
			ps.setString(4, asset.getSrno());
			ps.setInt(5, asset.getQuantity());
			ps.setString(6, asset.getAcquisitionDate());
			ps.setInt(7, asset.getCost());
			// ps.setString(8, asset.getOwner());

			try (Connection conn1 = DBUtility.getConnection()) {
				if (asset.getOwner().equals("Unassigned")) {
					ps.setString(8, asset.getOwner());
				} else {
					String query1 = "SELECT Username from UserLogin where FullName = ?";

					PreparedStatement ps1 = (PreparedStatement) conn1.prepareStatement(query1);
					ps1.setString(1, asset.getOwner());

					ResultSet rs = ps1.executeQuery();
					while (rs.next()) {
						ps.setString(8, rs.getString(1));
					}
				}
			}

			ps.setString(9, asset.getLocation());
			ps.setString(10, asset.getStatus());

			count = ps.executeUpdate();

		} catch (Exception e) {
			System.out.println(e);
		}

		return count;
	}

	public static int editAsset(Assets asset) {
		int count = 0;

		try (Connection conn = DBUtility.getConnection()) {

			String query = "Update Assets set Name =?, Description=?, Category=?, SerialNo=?, Quantity=?, "
					+ "AcquisitionDate=?, Cost=?, Owner=?, Location=?, Status=? where UniqueId =?";

			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setString(1, asset.getName());
			ps.setString(2, asset.getDescription());
			ps.setString(3, asset.getCategory());
			ps.setString(4, asset.getSrno());
			ps.setInt(5, asset.getQuantity());
			ps.setString(6, asset.getAcquisitionDate());
			ps.setInt(7, asset.getCost());
			// ps.setString(8, asset.getOwner());
			try (Connection conn1 = DBUtility.getConnection()) {
				if (asset.getOwner().equals("Unassigned")) {
					ps.setString(8, asset.getOwner());
				} else {
					String query1 = "SELECT Username from UserLogin where FullName = ?";

					PreparedStatement ps1 = (PreparedStatement) conn1.prepareStatement(query1);
					ps1.setString(1, asset.getOwner());

					ResultSet rs = ps1.executeQuery();
					while (rs.next()) {
						ps.setString(8, rs.getString(1));
					}
				}
			}

			ps.setString(9, asset.getLocation());
			ps.setString(10, asset.getStatus());
			ps.setInt(11, asset.getUid());

			count = ps.executeUpdate();

		} catch (Exception e) {
			System.out.println(e);
		}

		return count;
	}

	public static int removeAsset(Assets asset) {
		int count = 0;

		try (Connection conn = DBUtility.getConnection()) {

			String query = "DELETE FROM Assets where UniqueId =?";

			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setInt(1, asset.getUid());

			count = ps.executeUpdate();

		} catch (Exception e) {
			System.out.println(e);
		}

		return count;
	}

	public static List<Assets> showAssets(int role, String username, int id) {

		List<Assets> list = new ArrayList<>();

		try (Connection conn = DBUtility.getConnection()) {
			String query = "SELECT a.UniqueId, a.Name, a.Description, a.Category, a.SerialNo, a.Quantity, a.AcquisitionDate, a.Cost, u.FullName as Owner, a.Location, a.Status "
					+ " FROM Assets a inner join UserLogin u on a.Owner = u.Username where a.Owner=?";
			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setString(1, username);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				Assets asset = new Assets();
				asset.setUid(rs.getInt(1));
				asset.setName(rs.getString(2));
				asset.setDescription(rs.getString(3));

				String query1 = "Select c.Name from Assets a inner join Categories c on a.Category = c.Id where a.Category = ?";
				PreparedStatement ps1 = (PreparedStatement) conn.prepareStatement(query1);
				ps1.setString(1, rs.getString(4));

				ResultSet rs1 = ps1.executeQuery();
				while (rs1.next()) {
					asset.setCategory(rs1.getString(1));
				}

				asset.setSrno(rs.getString(5));
				asset.setQuantity(rs.getInt(6));
				asset.setAcquisitionDate(rs.getString(7));
				asset.setCost(rs.getInt(8));
				asset.setOwner(rs.getString(9));
				asset.setLocation(rs.getString(10));
				asset.setStatus(rs.getString(11));

				list.add(asset);
			}

		} catch (Exception e) {
			System.out.println(e);
		}

		if (role == 2) {
			try (Connection conn = DBUtility.getConnection()) {
				String query = "SELECT a.UniqueId, a.Name, a.Description, a.Category, u.FullName as Owner, a.SerialNo, a.Quantity, a.AcquisitionDate, a.Cost, a.Location, a.Status \n"
						+ "FROM Assets a inner join UserLogin u on a.Owner = u.Username where u.ManagerId = ?";
				PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
				ps.setInt(1, id);

				ResultSet rs = ps.executeQuery();

				while (rs.next()) {
					Assets asset = new Assets();
					asset.setUid(rs.getInt(1));
					asset.setName(rs.getString(2));
					asset.setDescription(rs.getString(3));

					String query1 = "Select c.Name from Assets a inner join Categories c on a.Category = c.Id where a.Category = ?";
					PreparedStatement ps1 = (PreparedStatement) conn.prepareStatement(query1);
					ps1.setString(1, rs.getString(4));
					
					ResultSet rs1 = ps1.executeQuery();
					while (rs1.next()) {
						asset.setCategory(rs1.getString(1));
					}

					asset.setOwner(rs.getString(5));
					asset.setSrno(rs.getString(6));
					asset.setQuantity(rs.getInt(7));
					asset.setAcquisitionDate(rs.getString(8));
					asset.setCost(rs.getInt(9));
					asset.setLocation(rs.getString(10));
					asset.setStatus(rs.getString(11));

					list.add(asset);
				}

				String query1 = "SELECT UniqueId, Name, Description, Category, Owner, SerialNo, Quantity, AcquisitionDate, Cost, Location, Status "
						+ "FROM Assets where Owner= ?";

				PreparedStatement ps1 = (PreparedStatement) conn.prepareStatement(query1);
				ps1.setString(1, "Unassigned");

				ResultSet rs1 = ps1.executeQuery();

				while (rs1.next()) {
					Assets asset1 = new Assets();
					asset1.setUid(rs1.getInt(1));
					asset1.setName(rs1.getString(2));
					asset1.setDescription(rs1.getString(3));
					
					String query2 = "Select c.Name from Assets a inner join Categories c on a.Category = c.Id where a.Category = ?";
					PreparedStatement ps2 = (PreparedStatement) conn.prepareStatement(query2);
					ps2.setString(1, rs1.getString(4));
					
					ResultSet rs2 = ps2.executeQuery();
					while(rs2.next()) {
						asset1.setCategory(rs2.getString(1));
					}
					
					asset1.setOwner(rs1.getString(5));
					asset1.setSrno(rs1.getString(6));
					asset1.setQuantity(rs1.getInt(7));
					asset1.setAcquisitionDate(rs1.getString(8));
					asset1.setCost(rs1.getInt(9));
					asset1.setLocation(rs1.getString(10));
					asset1.setStatus(rs1.getString(11));

					list.add(asset1);
				}

			} catch (Exception e) {
				System.out.println(e);
				e.printStackTrace();
			}
		}

		return list;
	}

	public static Object ownerDropdown(int role, int id) {

		List<String> list = new ArrayList<>();
		try (Connection conn = DBUtility.getConnection()) {
			String query = "SELECT FullName from UserLogin where ManagerId = ?";
			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);

			ps.setInt(1, id);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				list.add(rs.getString(1));
			}

		} catch (Exception e) {
			System.out.println(e);
		}

		return list;
	}

	// ----------------------------------------------------------------------------------------------------------
	// CATEGORIES

	public static int addCategory(Categories category) {
		int count = 0;

		try (Connection conn = DBUtility.getConnection()) {

			String query = "INSERT INTO Categories (Name, Description) VALUES(?,?)";

			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setString(1, category.getName());
			ps.setString(2, category.getDescription());

			count = ps.executeUpdate();

		} catch (Exception e) {
			System.out.println(e);
		}

		return count;
	}

	public static int editCategory(Categories category) {
		int count = 0;

		try (Connection conn = DBUtility.getConnection()) {

			String query = "Update Categories set Name =?, Description=? where Id =?";

			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setString(1, category.getName());
			ps.setString(2, category.getDescription());
			ps.setInt(3, category.getId());

			count = ps.executeUpdate();

		} catch (Exception e) {
			System.out.println(e);
		}

		return count;
	}

	public static int removeCategory(Categories category) {
		int count = 0;

		try (Connection conn = DBUtility.getConnection()) {

			String query = "DELETE FROM Categories where Id =?";

			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setInt(1, category.getId());

			count = ps.executeUpdate();

		} catch (Exception e) {
			System.out.println(e);
		}

		return count;
	}

	// error in removing categories

	public static List<Categories> showCategories(int role) {

		List<Categories> list = new ArrayList<>();

		try (Connection conn = DBUtility.getConnection()) {

			if (role == 2) {
				String query = "SELECT Id, Name, Description FROM Categories";

				PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);

				ResultSet rs = ps.executeQuery();

				while (rs.next()) {
					Categories category = new Categories();
					category.setId(rs.getInt(1));
					category.setName(rs.getString(2));
					category.setDescription(rs.getString(3));

					list.add(category);
				}

			}

		} catch (Exception e) {
			System.out.println(e);
		}

		return list;
	}

	public static Object assetUnderCategories(int id) {

		List<Assets> list = new ArrayList<>();

		try (Connection conn = DBUtility.getConnection()) {

			String query = "Select Name from Assets where Category = ?";
			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setInt(1, id);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				Assets asset = new Assets();
				asset.setName(rs.getString(1));

				list.add(asset);
			}
		} catch (Exception e) {
			System.out.println(e);
		}
		return list;
	}

	// ----------------------------------------------------------------------------------------------------------
	// REPORTS

	public static List<Assets> showReports(int id, int role) {
		List<Assets> list = new ArrayList<>();

		try (Connection conn = DBUtility.getConnection()) {
			String query = "SELECT a.UniqueId, a.Name, a.Description, a.Category, a.SerialNo, a.Quantity, a.AcquisitionDate, a.Cost, u.FullName as Owner, a.Location, a.Status \n"
					+ "FROM Assets a inner join UserLogin u on a.Owner = u.Username where u.id = ? ";

			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setInt(1, id);

			ResultSet rs = ps.executeQuery();

			while (rs.next()) {
				Assets asset = new Assets();
				asset.setUid(rs.getInt(1));
				asset.setName(rs.getString(2));
				asset.setDescription(rs.getString(3));
				
				String query1 = "Select c.Name from Assets a inner join Categories c on a.Category = c.Id where a.Category = ?";
				PreparedStatement ps1 = (PreparedStatement) conn.prepareStatement(query1);
				ps1.setString(1, rs.getString(4));
				
				ResultSet rs1 = ps1.executeQuery();
				while (rs1.next()) {
					asset.setCategory(rs1.getString(1));
				}
				
				asset.setSrno(rs.getString(5));
				asset.setQuantity(rs.getInt(6));
				asset.setAcquisitionDate(rs.getString(7));
				asset.setCost(rs.getInt(8));
				asset.setOwner(rs.getString(9));
				asset.setLocation(rs.getString(10));
				asset.setStatus(rs.getString(11));

				list.add(asset);

			}

		} catch (Exception e) {
			System.out.println(e);
		}

		if (role == 2) {
			try (Connection conn = DBUtility.getConnection()) {
				String query = "SELECT a.UniqueId, a.Name, a.Description, a.Category, a.SerialNo, a.Quantity, a.AcquisitionDate, a.Cost, u.FullName as Owner, a.Location, a.Status "
						+ "FROM Assets a inner join UserLogin u on a.Owner = u.Username where u.ManagerId = ? ";

				PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
				ps.setInt(1, id);

				ResultSet rs = ps.executeQuery();

				while (rs.next()) {
					Assets asset = new Assets();
					asset.setUid(rs.getInt(1));
					asset.setName(rs.getString(2));
					asset.setDescription(rs.getString(3));
					
					String query1 = "Select c.Name from Assets a inner join Categories c on a.Category = c.Id where a.Category = ?";
					PreparedStatement ps1 = (PreparedStatement) conn.prepareStatement(query1);
					ps1.setString(1, rs.getString(4));
					
					ResultSet rs1 = ps1.executeQuery();
					while (rs1.next()) {
						asset.setCategory(rs1.getString(1));
					}
					
					asset.setSrno(rs.getString(5));
					asset.setQuantity(rs.getInt(6));
					asset.setAcquisitionDate(rs.getString(7));
					asset.setCost(rs.getInt(8));
					asset.setOwner(rs.getString(9));
					asset.setLocation(rs.getString(10));
					asset.setStatus(rs.getString(11));

					list.add(asset);

				}

				String query1 = "SELECT UniqueId, Name, Description, Category, SerialNo, Quantity, AcquisitionDate, Cost, Owner, Location, Status "
						+ "FROM Assets where Owner=?";

				PreparedStatement ps1 = (PreparedStatement) conn.prepareStatement(query1);
				ps1.setString(1, "Unassigned");

				ResultSet rs1 = ps1.executeQuery();

				while (rs1.next()) {
					Assets asset1 = new Assets();
					asset1.setUid(rs1.getInt(1));
					asset1.setName(rs1.getString(2));
					asset1.setDescription(rs1.getString(3));
					
					String query2 = "Select c.Name from Assets a inner join Categories c on a.Category = c.Id where a.Category = ?";
					PreparedStatement ps2 = (PreparedStatement) conn.prepareStatement(query2);
					ps2.setString(1, rs1.getString(4));
					
					ResultSet rs2 = ps2.executeQuery();
					while (rs2.next()) {
						asset1.setCategory(rs2.getString(1));
					}
					
					asset1.setSrno(rs1.getString(5));
					asset1.setQuantity(rs1.getInt(6));
					asset1.setAcquisitionDate(rs1.getString(7));
					asset1.setCost(rs1.getInt(8));
					asset1.setOwner(rs1.getString(9));
					asset1.setLocation(rs1.getString(10));
					asset1.setStatus(rs1.getString(11));

					list.add(asset1);

				}

			} catch (Exception e) {
				System.out.println(e);
			}
		}

		return list;

	}

	public static Object allCategories() {

		List<Categories> list = new ArrayList<>();

		try (Connection conn = DBUtility.getConnection()) {

			String query = "Select Id, Name from Categories";
			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);

			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				Categories category = new Categories();
				category.setId(rs.getInt(1));
				category.setName(rs.getString(2));

				list.add(category);
			}
		} catch (Exception e) {
			System.out.println(e);
		}

		return list;
	}

	public static boolean updateAssetCategory(int oldCatId, int newCatId) {
		int count = 0;
		
		try(Connection conn = DBUtility.getConnection()){
			String query = "UPDATE Assets SET Category=? where Category=?";
			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			ps.setInt(1, newCatId);
			ps.setInt(2, oldCatId);
			
			count = ps.executeUpdate();
			
			
			
		}
		catch (Exception e) {
			System.out.println(e);
		}
		
		if(count>0) {
			return true;
		}
		else {
			return false;
		}
	}

	public static Object uniqueSrNo() {
		List<Assets> list = new ArrayList<>();
		
		try(Connection conn = DBUtility.getConnection()){
			String query = "Select SerialNo from Assets";
			PreparedStatement ps = (PreparedStatement) conn.prepareStatement(query);
			
			ResultSet rs = ps.executeQuery();
			while(rs.next()) {
				Assets asset = new Assets();
				asset.setSrno(rs.getString(1));
				
				list.add(asset);
			}
			
		}catch (Exception e) {
			System.out.println(e);
		}
		return list;
	}

}
