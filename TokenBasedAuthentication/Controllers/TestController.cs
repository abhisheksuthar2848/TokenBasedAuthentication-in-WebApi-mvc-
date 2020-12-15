using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TokenBasedAuthentication.EDM;

namespace TokenBasedAuthentication.Controllers
{
    [Authorize]
    [RoutePrefix("Api/Test")]
    public class TestController : ApiController
    {
        private readonly DBCrudWebApiEntities _context = null;
        public  TestController() {
            _context = new DBCrudWebApiEntities();

        }

        

        [HttpGet]
        [Route("GetAllCustumer")]
        public IHttpActionResult GetCustomer()
        {
            try
            {
                var CustomerData = _context.TblCustomers.ToList();
                return Ok(new
                {
                    data = CustomerData,
                    isSuccess = true

                });
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    isSuccess = false,
                    message = ex.Message
                });
            }
        }

        [HttpGet]
        [Route("GetCustomerById/{id}")]
        public IHttpActionResult GetCustomerById(int id)
        {
            try
            {
                var CustomerData = _context.TblCustomers.Find(id);

                return Ok(new
                {
                    isSucess = true,
                    data = CustomerData

                });
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    isSucess = false,
                    massage = ex

                });
            }
        }

        [HttpPost]
        [Route("InsertCustomer")]
        public IHttpActionResult InsertCustomer(TblCustomer data)
        {
            try
            {
                _context.TblCustomers.Add(data);
                _context.SaveChanges();

                return Ok(new
                {
                    isSucess = true,
                    massage = "Customer insert Sucesssfully"

                });
            }
            catch (Exception ex)
            {

                return Ok(new
                {
                    isSuccess = false,
                    message = ex.Message
                });
            }
        }


        [HttpPost]
        [Route("LoginCustomer")]
        public IHttpActionResult LoginCustomer(TblRegestration obj)
        {
            try
            {
                //_context.TblCustomers.Add(data);
               var cust= _context.TblRegestrations.Where(x => x.UserEmail == obj.UserEmail && x.UserPassword == obj.UserPassword).ToList();
               
              

                return Ok(new
                {
                    isSucess = true,
                    data = cust,
                    massage = "Customer insert Sucesssfully"

                });
            }
            catch (Exception ex)
            {

                return Ok(new
                {
                    isSuccess = false,
                    message = ex.Message
                });
            }
        }

        [HttpPost]
        [Route("UpdateCustomerDetails")]
        public IHttpActionResult UpdateCustomerDetails(TblCustomer obj)
        {

            try
            {
                var CustmerDetail = _context.TblCustomers.Find(obj.CustomerId);
                if (CustmerDetail != null)
                {
                    CustmerDetail.Name = obj.Name;
                    CustmerDetail.Address = obj.Address;
                    CustmerDetail.Birthdate = obj.Birthdate;
                    CustmerDetail.Emailid = obj.Emailid;
                    CustmerDetail.MobileNo = obj.MobileNo;

                    _context.SaveChanges();

                }

                return Ok(new
                {
                    isSucess = true,
                    massage = "Customer Update Sucesssfully"

                });
            }
            catch (Exception ex)
            {

                return Ok(new
                {
                    isSuccess = false,
                    message = ex.Message
                });
            }
        }

        [HttpPost]
        [Route("DeleteCustomerDetail/{id}")]
        public IHttpActionResult DeleteCustomer(int id)
        {

            try
            {
                var data = _context.TblCustomers.Find(id);
                _context.TblCustomers.Remove(data);
                _context.SaveChanges();


                return Ok(new
                {
                    isSucess = true,
                    massage = "Customer Delete Sucesssfully"

                });
            }
            catch (Exception ex)
            {

                return Ok(new
                {
                    isSuccess = false,
                    message = ex.Message
                });
            }
        }
    }
}
