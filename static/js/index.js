// index.js

$(".a-hide").hide();
$("#content0").show();

/**
 * 根据不同类型的请求，进行不同的操作
 * @param id	类型id
 */
function requestURL(id) {
	if ( id==1 ) { // 查看数据表的结构
		$(".a-hide").hide();
		var con = $("#content1");
		con.show();
		con.html("");
		con.append("<h3>Show The Structure Of Table <span font='#f00'>User</span></h3>");
		requestGET("/user/structure", "GET", con);
	} else if ( id==2 ) { // 查看数据表中所有记录
		$(".a-hide").hide();
		var con = $("#content2");
		con.show();
		con.html("");
		con.append("<h3>All Datas Of Table <span font='#f00'>User</span></h3>");
		requestGET("/user/all", "GET", con);
	} else if ( id==3 ) { // 查看数据表中某个id的记录
		$(".a-hide").hide();
		var con = $("#content3");
		con.show();
		$.ajax({
			url: "/user/maxid",
			type: "GET",
			success: function(data) {
				$("#maxId1").html(data);
			},
			error: function() {
				console.log("/user/maxid" + " error");
			}
		});
	} else if ( id==4 ) { // 向数据表中添加一条记录
		$(".a-hide").hide();
		var con = $("#content4");
		con.show();
	} else if ( id==5 ) { // 更改数据表中的一条记录
		$(".a-hide").hide();
		var con = $("#content5");
		con.show();
		var id2 = $("#id2");
		id2.html();
		$.ajax({
			url: "/user/all",
			type: "GET",
			success: function(data) {
				data = JSON.parse(data);
				for ( let i=0; i<data.length; i++ ) {
					var option = $("<option value='"+data[i]['id']+"'>"+data[i]['id']+"</option>");
					id2.append(option);
				}
			},
			error: function() {
				console.log(type + " " + url+" error");
			}
		});
	} else if ( id==6 ) { // 删除数据表中某个id 的记录
		$(".a-hide").hide();
		var con = $("#content6");
		con.show();
		$.ajax({
			url: "/user/maxid",
			type: "GET",
			success: function(data) {
				$("#maxId").html(data);
			},
			error: function() {
				console.log("/user/maxid" + " error");
			}
		});
	}
}

/**
 * 下拉框选中事件
 */
$("#id2").change(function(){
	var id = $(this).val();
	console.log(id);
	$.ajax({
		url: "/user/id/"+id,
		type: "GET",
		success: function(data) {
			data = JSON.parse(data);
			$("#name2").val(data[0].name);
			$("#age2").val(data[0].age);
			$("#sex2").val(data[0].sex);
		},
		error: function() {
			console.log("GET" + " " + "/user/id/" + id +" error");
		}
	});
});

/**
 * 修改user记录操作
 */
function modifyRecord() {
	var sub = $("#sub3");
	sub.html("");
	var id = $("#id2").val();
	var name = $("#name2").val();
	var sex = $("#sex2").val();
	var age = $("#age2").val();
	$.ajax({
		url: "/user",
		type: "PUT",
		data: {
			id: id,
			name: name,
			age: age,
			sex: sex
		},
		success: function(data) {
			console.log(data);
			data = JSON.parse(data);
			if ( data.success ) {
				sub.append("<h4>Modify Successful</h4>");
			} else {
				sub.append("<h4>Modify Failed</h4>");
			}
		},
		error: function() {
			console.log("PUT" + " " + "/user" + " error");
		}
	});
}

/**
 * 添加user记录操作
 */
function addRecord() {
	var sub = $("#sub2");
	sub.html("");
	var name = $("#name").val();
	var sex = $("#sex").val();
	var age = $("#age").val();
	$.ajax({
		url: "/user",
		type: "POST",
		data: {
			name: name,
			age: age,
			sex: sex
		},
		success: function(data) {
			console.log(data);
			data = JSON.parse(data);
			if ( data.success ) {
				sub.append("<h4>Add Successful, the id of adding data is "+data.id+"</h4>");
			} else {
				sub.append("<h4>Add Failed</h4>");
			}
		},
		error: function() {
			console.log("POST" + " " + "/user" + " error");
		}
	});
}

/**
 * 删除user记录操作
 */
function deleteRecord() {
	var id = parseInt($.trim($("#id").val()), 10);
	var sub = $("#sub");
	sub.html("");

	$.ajax({
		url: "/user/id/"+id,
		type: "DELETE",
		success: function(data) {
			console.log(data);
			data = JSON.parse(data);
			if ( data.success ) {
				sub.append("<h4>Delete Successful</h4>");
			} else {
				sub.append("<h4>Delete Failed</h4>");
			}
		},
		error: function() {
			console.log("DELETE" + " " + "/user/id" + " error");
		}
	});
}

/**
 * 查询具体某个id的记录
 */
function searchRecord() {
	var id = parseInt($.trim($("#id1").val()), 10);
	var sub = $("#sub1");
	sub.show();
	sub.html("");
	sub.append("<h3>Data(id = " + id + ") Of Table <span font='#f00'>User</span></h3>");
	requestGET('/user/id/'+id, 'GET', sub);
}

/**
 * 请求的封装
 * @param url	请求的资源地址
 * @param type	请求的类型
 * @param con	dom对象
 */
function requestGET(url, type, con) {
	$.ajax({
		url: url,
		type: type,
		success: function(data) {
			data = JSON.parse(data);
			var table = $("<table class='table table-bordered'></table>");
			console.log(data[0]);
			var keyArr = Object.keys(data[0]);
			console.log(keyArr);
			var tr = $("<tr></tr>");
			for ( let i=0; i<keyArr.length; i++ ) {
				var td = $("<td>"+keyArr[i]+"</td>");
				tr.append(td);
			}
			table.append(tr);
			for ( let i=0; i<data.length; i++ ) {
				var tr = $("<tr></tr>");
				for ( let j=0; j<keyArr.length; j++ ) {
					var td = $("<td>"+data[i][keyArr[j]]+"</td>");
					tr.append(td);
				}
				table.append(tr);
			}
			con.append(table);
		},
		error: function() {
			console.log(type + " " + url+" error");
		}
	});
}

