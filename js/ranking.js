$(function(){
	var arr = [];
	arr = JSON.parse(localStorage.getItem('xephang'));

	arr.sort(function(a, b){
		var scoreA = parseInt(a.Score);
		var scoreB = parseInt(b.Score);
		var timeA = parseInt(a.Time);
		var timeB = parseInt(b.Time);

		var ss = 0;
		if( scoreA > scoreB ){
			ss = 1;
		}
		else if ( scoreB > scoreA ){
			ss = -1;
		}
		else
		{
			if( timeB > timeA ){
				ss = 1;
			}
			else if( timeA > timeB ){
				ss = -1;
			}
		}
		return ss * -1;
	})


	var diem, thoigian;
	for(var i=0;i<arr.length;i++)
	{
		var tt;
		if( diem==arr[i].Score && thoigian==arr[i].Time )
		{
			tt = i;
		}
		else
		{
			tt = i + 1;
		}

		var tr = '<tr>'+
					'<th>'+tt+'</th>'+
					'<th>'+arr[i].Name+'</th>'+
					'<th>'+arr[i].Score+'</th>'+
					'<th>'+arr[i].Time+'</th>'+
				'</tr>';
		$('table').append(tr);

		diem=arr[i].Score;
		thoigian=arr[i].Time;
	}
})