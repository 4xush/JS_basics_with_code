// 1. Define a functional interface (callback contract)
interface Callback {
    void onDataReceived(String data);
}

// 2. Function that takes a callback
class DataFetcher {
    public void getData(Callback callback) {
        // Simulate async work using a thread
        Thread t = new Thread(() -> {
            try {
                Thread.sleep(1000); // wait 1 second
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            callback.onDataReceived("Async Data");
        });
        t.start();
    }
    /*
     * Runnable r = new Runnable() {
    @Override
    public void run() {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        callback.onDataReceived("Async Data");
    }
};

Thread t = new Thread(r);
t.start();

     */
}

// 3. Usage
public class Main {
    public static void main(String[] args) {
        DataFetcher fetcher = new DataFetcher();

        fetcher.getData(new Callback() {
            @Override
            public void onDataReceived(String data) {
                System.out.println("Got: " + data);
            }
        });
    }
}
