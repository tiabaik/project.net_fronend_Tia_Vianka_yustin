using Microsoft.AspNetCore.Mvc;

namespace PeerLendingFE.Controllers
{
    public class LenderController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ListBorrower()
        {
            return View();
        }

        public IActionResult HistoryLoan()
        {
            return View();
        }
    }
}
