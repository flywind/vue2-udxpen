import request from '@/utils/request'

export function getSystemInfo(){
	return request({
		url: '/api/systemseting',
		method: 'post'
	})
}
