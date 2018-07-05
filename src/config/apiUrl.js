let apiUrl=''
if(process.env.NODE_ENV === 'development'){
    apiUrl='http://118.89.190.166:9980'
}else if(process.env.NODE_ENV === 'testing'){
    apiUrl='http://118.89.190.166:9980'
}else if(process.env.NODE_ENV === 'production'){
    apiUrl='http://123.206.195.237:9980'
}

export default apiUrl