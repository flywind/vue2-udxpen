import request from '@/utils/request'

export function getTechnologys(title, technologyType, pageNumber, pageSize){
	const params = {
		title,
		technologyType,
		pageNumber,
		pageSize
	}
	return request({
		url: '/api/content/list',
		method: 'get',
		params
	})
}
export function createTechnology(data){
	return request({
		url: '/api/content/add',
		method: 'post',
		data
	})
}
export function deleteTechnology(data){
	return request({
		url: '/api/content/del',
		method: 'post',
		data
	})
}
export function updateTechnology(data){
	return request({
		url: '/api/content/update',
		method: 'post',
		data
	})
}
