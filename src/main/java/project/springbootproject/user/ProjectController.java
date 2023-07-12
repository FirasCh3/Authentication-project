package project.springbootproject.user;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@CrossOrigin(origins = "*")
@RestController
public class ProjectController {
    @Autowired
    private ProjectService ProjectService;
    @RequestMapping("/users")
    public Iterable<UserInformation> GetInfo(){
        return ProjectService.GetUserInfo();
    }
   @RequestMapping(method=RequestMethod.POST, value = "/adduser")
    public Object InsertInfo(@RequestBody UserInformation user){
        return ProjectService.AddUser(user);
    }
    @RequestMapping(method = RequestMethod.POST,value = "/auth")
    public Map<String,Object> authenticate(@RequestBody UserInformation LoginInformation){
        return ProjectService.authenticate(LoginInformation);
    }
    @DeleteMapping("/delete")
    public void delete(@RequestParam Integer id){
        ProjectService.DeleteUser(id);
    }

}
