package project.springbootproject.user;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
public class ProjectService {
    @Autowired
    private Repo repository;
    public boolean DoesNotExist(UserInformation LoginInformation, Iterable<UserInformation> users){
        for (UserInformation element:users
             ) {
                if(Objects.equals(element.email, LoginInformation.email) && Objects.equals(element.password, LoginInformation.password)){

                    return false;
                }
        }
        return true;
 }
    public Iterable<UserInformation> GetUserInfo(){

        return repository.findAll();
    }
    public boolean findUser(String email,Iterable<UserInformation> users){
        for(UserInformation user:users){
            if(Objects.equals(user.email, email)){
                return true;
            }
        }
        return false;
    }
    public Object AddUser(UserInformation user){
        System.out.println(findUser(user.getEmail(),repository.findAll()));
        if(findUser(user.getEmail(),repository.findAll())){

            return true;
        }else{
            repository.save(user);
            return null;
        }

    }

    public Map<String,Object> authenticate(UserInformation LoginInformation){
        if(DoesNotExist(LoginInformation,repository.findAll())){
            return null;

        }else{
            Map<String,Object> token=new HashMap<String,Object>();
            String value= UUID.randomUUID().toString();
            token.put("token",value);
            return token;

        }
    }
    public void DeleteUser(Integer id){
        repository.deleteById(id);

    }


}
