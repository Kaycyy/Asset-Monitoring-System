// controller method starts to process the web request by interacting with the service layer to complete 
// the work that needs to be done.


package com.qlc.demo.controller;

import com.qlc.demo.model.*;
import com.qlc.demo.service.*;

import java.sql.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/demo")
public class restController {

	@PostMapping("/login")
	@ResponseBody
	public Object Login(@RequestBody LoginInfo login) throws ClassNotFoundException, SQLException {
		Map<String, Object> object = new HashMap<>();

		if (Service.checkIfUserExists(login.getUsername(), login.getPassword())) {
			LoginInfo loginInfo = Service.getLoginInfo(login.getUsername());

			object.put("status", "Success");
			object.put("error", "");
			object.put("errorMsg", "");
			object.put("result", loginInfo);
			return object;
		} else {
			object.put("status", "Failed");
			object.put("error", "");
			object.put("errorMsg", "Invalid credentials.");
			object.put("result", "");
			return object;
		}
	}

	// ASSET API'S
	@PostMapping("/addAsset")
	public int addAsset(@RequestBody Assets asset) throws ClassNotFoundException, SQLException {
		return Service.addAsset(asset);
	}

	@PostMapping("/editAsset")
	public int editAsset(@RequestBody Assets asset) throws ClassNotFoundException, SQLException {
		return Service.editAsset(asset);
	}

	@PostMapping("/removeAsset")
	public int removeAsset(@RequestBody Assets asset) throws ClassNotFoundException, SQLException {
		return Service.removeAsset(asset);
	}

	@GetMapping("/showAssets")
	public Object showAssets(@RequestParam int role, @RequestParam String username, @RequestParam int id)
			throws ClassNotFoundException, SQLException {

		Map<String, Object> object = new HashMap<>();
		object.put("status", "Success");
		object.put("error", "");
		object.put("errorMsg", "");
		object.put("result", Service.showAssets(role, username, id));
		return object;

	}
	
	@PostMapping("/updateAssetCategory")
	public boolean updateAssetCategory(@RequestParam int oldCatId, @RequestParam int newCatId) throws ClassNotFoundException, SQLException {
		return Service.updateAssetCategory(oldCatId, newCatId);
	}

	@GetMapping("/ownerDropdown")
	public Object ownerDropdown(@RequestParam int role, @RequestParam int id)
			throws ClassNotFoundException, SQLException {
		Map<String, Object> object = new HashMap<>();
		object.put("status", "Success");
		object.put("error", "");
		object.put("errorMsg", "");
		object.put("result", Service.ownerDropdown(role, id));
		return object;
	}

	// CATEGORY API'S
	@PostMapping("/addCategory")
	public int addCategory(@RequestBody Categories category) throws ClassNotFoundException, SQLException {
		return Service.addCategory(category);
	}

	@PostMapping("/editCategory")
	public int editCategory(@RequestBody Categories category) throws ClassNotFoundException, SQLException {
		return Service.editCategory(category);
	}

	@PostMapping("/removeCategory")
	public int removeCategory(@RequestBody Categories category) throws ClassNotFoundException, SQLException {
		return Service.removeCategory(category);
	}
	
	
	
	@GetMapping("/assetUnderCategories")
	public Object assetUnderCategories(@RequestParam int id) throws ClassNotFoundException, SQLException {
		Map<String, Object> object = new HashMap<>();
		object.put("status", "Success");
		object.put("error", "");
		object.put("errorMsg", "");
		object.put("result", Service.assetUnderCategories(id));
		return object;
	}
	

	@GetMapping("/showCategories")
	public Object showCategories(@RequestParam int role) throws ClassNotFoundException, SQLException {
		Map<String, Object> object = new HashMap<>();
		object.put("status", "Success");
		object.put("error", "");
		object.put("errorMsg", "");
		object.put("result", Service.showCategories(role));
		return object;
	}
	
	@GetMapping("/allCategories")
	public Object allCategories() throws ClassNotFoundException, SQLException {
		Map<String, Object> object = new HashMap<>();
		object.put("status", "Success");
		object.put("error", "");
		object.put("errorMsg", "");
		object.put("result", Service.allCategories());
		return object;
	}

	// REPORT API'S
	@GetMapping("/showReports")
	public Object showReports(@RequestParam int id, @RequestParam int role)
			throws ClassNotFoundException, SQLException {
		Map<String, Object> object = new HashMap<>();
		object.put("status", "Success");
		object.put("error", "");
		object.put("errorMsg", "");
		object.put("result", Service.showReports(id, role));
		return object;

	}
	
	@GetMapping("/uniqueSrNo")
	public Object uniqueSrNo() throws ClassNotFoundException, SQLException {
		Map<String, Object> object = new HashMap<>();
		object.put("status", "Success");
		object.put("error", "");
		object.put("errorMsg", "");
		object.put("result", Service.uniqueSrNo());
		return object;
	}	

}
