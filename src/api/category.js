import request from '@/utils/request'

export function getCategorys(type, name, pageNumber, pageSize) {
	const data = {
		type,
		name,
		pageNumber,
		pageSize
	}
	return request({
		url: '/api/category/list',
		method: 'get',
		data
	})
}